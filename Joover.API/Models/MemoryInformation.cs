namespace Joover.API.Models;

public class MemoryInformation
{
    public float AvailableCapacity { get; set; }
    public ulong TotalCapacity { get; set; }
    public uint Voltage { get; set; }
    public uint ClockSpeed { get; set; }
}
