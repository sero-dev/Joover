using Joover.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Management;

namespace Joover.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PartController() : ControllerBase
{
    [HttpGet("processor")]
    public IActionResult GetProcessorInformation() {

        string name = "";
        uint coreCount = 0;
        uint logicalProcessorCount = 0;
        uint maxClockSpeed = 0;
        uint l2CacheSize = 0;
        uint l3CacheSize = 0;

        using var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_Processor");


        Stopwatch stopwatch = new Stopwatch();

        foreach (var obj in searcher.Get())
        {
            name = Convert.ToString(obj["Name"]) ?? "Name not available";
            coreCount += Convert.ToUInt32(obj["NumberOfCores"]);
            logicalProcessorCount += Convert.ToUInt32(obj["NumberOfLogicalProcessors"]);
            maxClockSpeed = Convert.ToUInt32(obj["MaxClockSpeed"]);
            l2CacheSize = Convert.ToUInt32(obj["L2CacheSize"]);
            l3CacheSize = Convert.ToUInt32(obj["L3CacheSize"]);
        }

        return Ok(new ProcessorInformation
        {
            Name = name,
            CoreCount = coreCount,
            LogicalProcessorCount = logicalProcessorCount,
            MaxClockSpeed = maxClockSpeed,
            L2CacheSize = l2CacheSize,
            L3CacheSize = l3CacheSize,
        });
    }

    [HttpGet("memory")]
    public IActionResult GetMemoryInformation()
    {
        ulong capacity = 0;
        uint voltage = 0;
        uint clockSpeed = 0;
        
        using var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_PhysicalMemory");

        foreach (var obj in searcher.Get())
        {
            capacity += Convert.ToUInt64(obj.Properties["Capacity"].Value);
            voltage = Convert.ToUInt32(obj.Properties["ConfiguredVoltage"].Value);
            clockSpeed = Convert.ToUInt32(obj.Properties["Speed"].Value);
        }

        var capacityKB = capacity / 1024;
        var capacityMB = capacityKB / 1024;

        return Ok(new MemoryInformation
        {
            TotalCapacity = capacityMB,
            Voltage = voltage,
            ClockSpeed = clockSpeed
        });
    }
}


