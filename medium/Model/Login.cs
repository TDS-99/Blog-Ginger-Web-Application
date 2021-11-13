using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace medium.Model
{
    public class Login : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string image { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public List<Blog> Blogs { get; set; }
        public List<Comment> Comments { get; set; }

    }
    }

