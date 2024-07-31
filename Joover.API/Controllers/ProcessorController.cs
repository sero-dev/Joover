using Joover.API.Models;
using Joover.API.Service;
using Microsoft.AspNetCore.Mvc;

namespace Joover.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProcessorController(ProcessorService service) : ControllerBase
{
    private readonly ProcessorService service = service;

    [HttpGet]
    public IActionResult GetProcessorInformation() {

        var metrics = service.GetMetrics();

        return Ok(new ProcessorInformation
        {
            Name = service.GetName(),
            Usage = service.GetUsage(),
            CoreCount = metrics.CoreCount,
            LogicalProcessorCount = metrics.LogicalProcessorCount,
            MaxClockSpeed = metrics.MaxClockSpeed,
            L2CacheSize = metrics.L2CacheSize,
            L3CacheSize = metrics.L3CacheSize,
        });
    }
}


