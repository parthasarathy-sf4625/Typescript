namespace API_MetpoApplication;

public class TravelInfo
{
    public int TravelID{get; set;}
    public int CardID{get; set;}
    public string FromLocation{get; set;}
    public string ToLocation{get; set;}
    public double TravelCost{get; set;}
    public DateTime TravelDate{get; set;}
}