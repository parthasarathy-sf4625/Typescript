
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace APIMedicalStore;

[Table("orderDetails", Schema = "public")]
public class OrderDetails
{

     [Key]
    public int OrderID{get;set;}

    public int MedicineID{get;set;}
    public int UserID{get;set;}
    public string MedicineName{get;set;}
    public int Quantity{get;set;}
    public string OrderDate{get;set;}
    public double TotalPrice{get;set;}
    public string OrderStatus{get;set;}
    
}