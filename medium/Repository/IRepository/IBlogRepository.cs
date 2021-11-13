using medium.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medium.Repository.IRepository
{
    public interface IBlogRepository
    {
        public Blog Create(Blog blog);
        public void Edit(Blog blog);
        public Blog GetSingleBlog(int id);
        public void Delete(Blog blog);
        public List<Blog> GetAllBlogs();
        public List<Blog> GetBlogByUserId(string userId);
        
    }
}
