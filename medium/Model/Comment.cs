using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace medium.Model
{
    public class Comment
    {
        [Key]
        public int? Id { get; set; }
       [Required]
        public string UserComment { get; set; }
        public DateTime Created { get; set; }
        public Login User { get; set; }
        public string UserId { get; set; }
        
        public int BlogId { get; set; }
    }
}
