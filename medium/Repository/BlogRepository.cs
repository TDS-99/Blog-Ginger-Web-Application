using medium.Model;
using medium.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medium.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private UserContext _context;

        public BlogRepository(UserContext context)
        {
            _context = context;

        }
        public Blog Create(Blog blog)
        {
            _context.Add(blog);
            return blog;
        }

        public void Delete(Blog blog)
        {
            _context.Blog.Remove(blog);
            _context.SaveChanges();
        }

        public void Edit(Blog blog)
        {
            _context.Blog.Update(blog);
            _context.SaveChanges();
        }

        public List<Blog> GetAllBlogs()
        {
            return _context.Blog.ToList();
        }

        public List<Blog> GetBlogByUserId(string userId)
        {
            
            return _context.Blog.Where (p=>p.UserId.Equals(userId)).ToList();
            // return await _context.Blog.ToListAsync();
        
    }

        public Blog GetSingleBlog(int id)
        {
            var blog = _context.Blog.FirstOrDefault(b => b.Id == id);
            return blog;
        }
    }
}
