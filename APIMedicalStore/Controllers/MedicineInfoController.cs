using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace APIMedicalStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MedicineInfoController : ControllerBase
{
    private readonly ApplicationDBContext _dbContext;
    
    public MedicineInfoController(ApplicationDBContext applicationDBContext)
    {

        _dbContext = applicationDBContext;
    }

    [HttpGet]
    //Get Details
    public IActionResult GetMedicineDetails()
    {
        return Ok   (_dbContext.medicines.ToList());
    }
    //Set Details
    [HttpGet("{medicineID}")]
    public IActionResult GetIndividualMedicineDetails(int medicineID)
    {
        var medicine = _dbContext.medicines.FirstOrDefault(medicine => medicine.MedicineID == medicineID);
        if (medicine == null)
        {
            return NotFound();
        }
        return Ok(medicine);
    }
    //Add Details
    [HttpPost]
    public IActionResult AddMedicineDetails([FromBody] MedicineInfo medicine)
    {
        _dbContext.medicines.Add(medicine);
        _dbContext.SaveChanges();
        return Ok();
    }
    //Update Details
    [HttpPut("{medicineID}")]
    public IActionResult UpdateMedicineDetails(int medicineID, [FromBody] MedicineInfo medicine)
    {
        var medicineOld = _dbContext.medicines.FirstOrDefault(medicine => medicine.MedicineID == medicineID);
        if (medicineOld == null)
        {
            return NotFound();
        }
        medicineOld.Quantity = medicine.Quantity;
        medicineOld.ExpiryDate = medicine.ExpiryDate;
        medicineOld.MedicineName = medicine.MedicineName;
        medicineOld.MedicinePrice = medicine.MedicinePrice;
        _dbContext.SaveChanges();
        return Ok();
    }
    //Delete Details
    [HttpDelete("{medicineID}")]
    public IActionResult DeleteMedicine(int medicineID)
    {
        var medicine = _dbContext.medicines.FirstOrDefault(medicine => medicine.MedicineID == medicineID);
        if (medicine == null)
        {
            return NotFound();
        }
        _dbContext.medicines.Remove(medicine);
        _dbContext.SaveChanges();
        return Ok();
    }
}