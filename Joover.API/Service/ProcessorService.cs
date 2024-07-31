using Joover.API.Models;
using Microsoft.Win32;
using System.Diagnostics;
using System.Management;

namespace Joover.API.Service;

public class ProcessorService
{
    public string GetName()
    {
        string cpuName = string.Empty;
        using (RegistryKey key = Registry.LocalMachine.OpenSubKey(@"HARDWARE\DESCRIPTION\System\CentralProcessor\0"))
        {
            if (key != null)
            {
                object o = key.GetValue("ProcessorNameString");
                if (o != null)
                {
                    cpuName = o.ToString();
                }
            }
        }
        return cpuName;
    }

    public float GetUsage()
    {
        var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");

        cpuCounter.NextValue();
        Thread.Sleep(1000);
        float cpuUsage = cpuCounter.NextValue();
        
        return cpuUsage;
    }

    public ProcessorMetrics GetMetrics()
    {
        uint coreCount = 0;
        uint logicalProcessorCount = 0;
        uint maxClockSpeed = 0;
        uint l2CacheSize = 0;
        uint l3CacheSize = 0;

        using var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_Processor");

        foreach (var obj in searcher.Get())
        {
            coreCount += Convert.ToUInt32(obj["NumberOfCores"]);
            logicalProcessorCount += Convert.ToUInt32(obj["NumberOfLogicalProcessors"]);
            maxClockSpeed = Convert.ToUInt32(obj["MaxClockSpeed"]);
            l2CacheSize = Convert.ToUInt32(obj["L2CacheSize"]);
            l3CacheSize = Convert.ToUInt32(obj["L3CacheSize"]);
        }

        return new ProcessorMetrics
        {
            CoreCount = coreCount,
            LogicalProcessorCount = logicalProcessorCount,
            MaxClockSpeed = maxClockSpeed,
            L2CacheSize = l2CacheSize,
            L3CacheSize = l3CacheSize,
        };
    }
}
