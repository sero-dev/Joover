using Joover.API.Models;
using Joover.API.Service;
using Microsoft.AspNetCore.Mvc;


namespace Joover.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MemoryController(MemoryService service): ControllerBase
{
    private readonly MemoryService service = service;

    [HttpGet]
    public IActionResult GetMemoryInformation()
    {
        var metrics = service.GetMemoryMetrics();

        return Ok(new MemoryInformation
        {
            AvailableCapacity = service.GetAvailableMemoryInMb(),
            TotalCapacity = metrics.TotalCapacity,
            Voltage = metrics.Voltage,
            ClockSpeed = metrics.ClockSpeed
        });
    }
}
