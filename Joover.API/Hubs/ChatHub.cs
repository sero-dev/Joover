using Joover.API.Models;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace Joover.API.Hubs;

public class ChatHub: Hub
{

    public async Task NewMessage(Message message)
    {
        await Clients.All.SendAsync(Channels.ReceiveMessageChannel, message);
    }

    public static class Channels
    {
        public static readonly string ReceiveMessageChannel = "ReceiveMessage";
    }
}