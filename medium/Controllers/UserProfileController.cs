using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using medium.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<Login> _userManager;
        private SignInManager<Login> _singInManager;
        private readonly IWebHostEnvironment _hostEnvironment;
        
        public UserProfileController(UserContext context,UserManager<Login> userManager, SignInManager<Login> signInManager, IWebHostEnvironment hostEnvironment)
        {
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
            _singInManager = signInManager;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.image,
                ImageSrc = String.Format("{0}://{1}{2}/ProfilePicture/{3}", Request.Scheme, Request.Host, Request.PathBase, user.image)
            };
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> PutUser([FromForm]Login login)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (userId != user.Id)
             {
             return BadRequest("Id not match");
             }

          if (login.ImageFile != null)
            {
                if (user.image != null)
                {
                    DeleteImage(user.image);
                }
                    user.image = await SaveImage(login.ImageFile);
            }
            await _userManager.UpdateAsync(user);

            return NoContent();
        }

        [HttpPost]
        [Authorize]
        public async Task<Object> OnPostAsync([FromForm]Login login)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = userId;
            login.image = await SaveImage(login.ImageFile);
            await _userManager.UpdateAsync(login);
            await _singInManager.RefreshSignInAsync(login);
            return StatusCode(201);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "ProfilePicture", imageName);
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