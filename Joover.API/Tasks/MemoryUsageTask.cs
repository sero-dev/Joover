using Coravel.Invocable;
using Joover.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace Joover.API.Tasks;

public class MemoryUsageTask(IHubContext<PartHub> partHub) : IInvocable
{
    private readonly IHubContext<PartHub> partHub = partHub;

    public async Task Invoke()
    {
        var availableMemory = GetAvailableMemoryInMb();
        Console.WriteLine("Available Memory: " + availableMemory);
    }

    private float GetAvailableMemoryInMb()
    {
        PerformanceCounter ramCounter = new PerformanceCounter("Memory", "Available MBytes");
        return ramCounter.NextValue();
    }
}