using Bogus;
using Coravel.Invocable;
using Joover.API.Hubs;
using Joover.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Joover.API.Tasks;

public class FakeChatMessageTask(IHubContext<ChatHub> chatHub) : IInvocable
{
    public async Task Invoke()
    {
        var faker = new Faker();
        var messageHeader = new Message
        {
            Text = faker.Lorem.Sentence(),
            Username = faker.Name.FullName()
        };

        await chatHub.Clients.All.SendAsync(ChatHub.Channels.ReceiveMessageChannel, messageHeader);
    }
}

