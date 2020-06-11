import React from 'react';
import { GiftedChat } from 'react-web-gifted-chat';
class Chat extends React.Component {
	constructor(props) { super(props); this.state = { messages: [], }; }
	componentWillMount() {
		this.setState({
			messages: [
				{
					id: 1,
					text: 'Hello developer',
					createdAt: new Date(),
					user: {
						id: 2,
						name: 'React'
					},
				},
			],
		});
	}
	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));
	}
	render() {
		return (
			<React.Fragment>
				<GiftedChat
					messages={this.state.messages}
					onSend={(messages) => this.onSend(messages)}
					user={{
						id: 1,
					}}
				/>
			</React.Fragment>
		);
	}
}

export default Chat;