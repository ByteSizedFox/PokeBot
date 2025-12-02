package main

import (
	"github.com/bwmarrin/discordgo"
)

func commandScreen(s *discordgo.Session, i *discordgo.InteractionCreate) {
	if checkBanned(s, i) {
		return
	}
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})
	buttons := getButtons()
	s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
		Embeds: nil, // &embeds,
		Components: &buttons,
	})
}
