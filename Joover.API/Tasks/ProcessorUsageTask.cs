using Coravel.Invocable;
using Joover.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace Joover.API.Tasks;

public class ProcessorUsageTask(IHubContext<PartHub> partHub) : IInvocable
{
    private readonly IHubContext<PartHub> partHub = partHub;

    public async Task Invoke()
    {
        var cpuUsage = GetUsage();
        Console.WriteLine("CPU Usage: " + cpuUsage);
    }

    private float GetUsage()
    {
        var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");

        cpuCounter.NextValue();
        Thread.Sleep(1000);
        float cpuUsage = cpuCounter.NextValue();

        return cpuUsage;
    }
}
