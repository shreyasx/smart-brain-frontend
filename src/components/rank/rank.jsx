import React, { useEffect, useState } from "react";

const Rank = ({ name, entries }) => {
	const [emoji, setEmoji] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					"https://l9sj8z0hg0.execute-api.us-east-1.amazonaws.com/rank?rank=" +
						entries
				);
				const emoji = await response.json();
				setEmoji(emoji.emoji);
			} catch (e) {
				console.log(e);
			}
		})();
	}, [entries]);

	return (
		<div>
			<div className="white f3">{`${name}, your current entry count is...`}</div>
			<div className="white f3">{entries}</div>
			<div className="white f3">{`Rank Badge: ${emoji}`}</div>
		</div>
	);
};

export default Rank;
