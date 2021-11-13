using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using medium.Model;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace medium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Blogs1Controller : ControllerBase
    {
        private readonly UserContext _context;
        private UserManager<Login> _userManager;
        private readonly IWebHostEnvironment _hostEnvironment;

        public Blogs1Controller(UserContext context, UserManager<Login> userManager, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/Blogs1
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlog()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return await _context.Blog.Where(p => p.UserId.Equals(userId))
                .Select(x => new Blog()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Story = x.Story,
                    Created = x.Created,
                    UserId = x.UserId,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Blog/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();

            // return await _context.Blog.ToListAsync();
        }

        // GET: api/Blogs1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int? id)
        {
            var blog = await _context.Blog.FindAsync(id);
            //var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "blog", blog.ImageName);
            if (blog == null)
            {
                return NotFound();
            }
            blog.ImageSrc = String.Format("{0}://{1}{2}/Blog/{3}", Request.Scheme, Request.Host, Request.PathBase, blog.ImageName);

            return blog;
        }

        // PUT: api/Blogs1/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutBlog(int id , [FromForm]Blog blog)
        {
           if (id != blog.Id)
             {
             return BadRequest("Id not match");
             }

          if (blog.ImageFile != null)
            {
               DeleteImage(blog.ImageName);
               blog.ImageName = await SaveImage(blog.ImageFile);
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                blog.UserId = userId;
            }
            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPut("put/{id}")]
        [Authorize]
        public async Task<IActionResult> PutBlog2(int id,Blog blog)
        {
            if (id != blog.Id)
            {
                return BadRequest("Id not match");
            }

           
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                blog.UserId = userId;
            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // POST: api/Blogs1
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Blog>> PostBlog([FromForm]Blog blog)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            blog.UserId = userId;
            blog.ImageName = await SaveImage(blog.ImageFile);
            _context.Blog.Add(blog);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        [HttpPost("post")]
        [Authorize]
        public async Task<ActionResult<Blog>> PostBlog2(Blog blog)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            blog.UserId = userId;
            _context.Blog.Add(blog);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Blogs1/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Blog>> DeleteBlog(int? id)
        {
            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            if (blog.ImageName != null)
            {
                DeleteImage(blog.ImageName);
            }
            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return blog;
        }

        private bool BlogExists(int? id)
        {
            return _context.Blog.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "blog", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "blog", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
