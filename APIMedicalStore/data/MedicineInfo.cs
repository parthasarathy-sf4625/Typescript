using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace APIMedicalStore;

[Table("medicineInfo", Schema = "public")]
public class MedicineInfo
{
    [Key]
    public int MedicineID { get; set; }
    public string MedicineName { get; set; }
    public double MedicinePrice { get; set; }
    public int Quantity { get; set; }
    public string ExpiryDate { get; set; }
}

