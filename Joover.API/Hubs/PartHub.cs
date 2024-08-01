using Microsoft.AspNetCore.SignalR;

namespace Joover.API.Hubs;

public class PartHub : Hub
{
    public async Task SendMessage(string user, string message) => await Clients.All.SendAsync("ReceiveMessage", user, message);
}
