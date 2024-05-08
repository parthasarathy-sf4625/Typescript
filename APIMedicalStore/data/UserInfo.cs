
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIMedicalStore;

[Table("userInfo", Schema = "public")]
public class UserInfo
{   
    [Key]
    public int UserID { get; set; }
    public string UserName { get; set; }

    public string UserEmail { get; set; }

    public string UserPassword { get; set; }

    public string Phone { get; set; }

    public double Balance { get; set; }
}

