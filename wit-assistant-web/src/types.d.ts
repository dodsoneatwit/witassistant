// This type backs the message view, with the messages stored in a pinia store in ./stores/messages.ts
// additionally it can have related links, generally for messages with the sender assistant
type Message = {
  text: string,
  sender: 'self' | 'assistant' | 'assistant-initial',
  /// Only defined on assistant messages
  relatedLinks?: string[]
}

// This is the response from the API
type Answer = {
  response: string,
  related_links?: string[]
}