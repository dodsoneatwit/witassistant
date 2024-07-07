type Message = {
  text: string,
  sender: 'self' | 'assistant',
  /// Only defined on assistant messages
  relatedLinks?: string[]
}

type Answer = {
  response: string,
  related_links?: string[]
}