namespace Joover.API.Models;

public class ProcessorMetrics
{
    public uint CoreCount { get; set; }
    public uint LogicalProcessorCount { get; set; }
    public uint MaxClockSpeed { get; set; }
    public uint L2CacheSize { get; set; }
    public uint L3CacheSize { get; set; }
}
