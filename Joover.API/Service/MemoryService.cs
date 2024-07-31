using Joover.API.Models;
using System.Diagnostics;
using System.Management;

namespace Joover.API.Service;

public class MemoryService
{
    public float GetAvailableMemoryInMb()
    {
        PerformanceCounter ramCounter = new PerformanceCounter("Memory", "Available MBytes");
        return ramCounter.NextValue();
    }

    public MemoryMetrics GetMemoryMetrics()
    {
        using var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_PhysicalMemory");

        ulong capacity = 0;
        uint voltage = 0;
        uint clockSpeed = 0;

        foreach (var obj in searcher.Get())
        {
            capacity += Convert.ToUInt64(obj.Properties["Capacity"].Value);
            voltage = Convert.ToUInt32(obj.Properties["ConfiguredVoltage"].Value);
            clockSpeed = Convert.ToUInt32(obj.Properties["Speed"].Value);
        }

        var capacityKB = capacity / 1024;
        var capacityMB = capacityKB / 1024;

        return new MemoryMetrics
        {
            TotalCapacity = capacityMB,
            Voltage = voltage,
            ClockSpeed = clockSpeed
        };
    }
}
