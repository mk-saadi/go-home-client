import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// eslint-disable-next-line react/prop-types
const Typography = ({ content }) => {
	return (
		<div className="relative">
			<ReactMarkdown
				className="text-base font-medium prose text-gray-900 break-words whitespace-pre-line markdown md:text-base max-w-prose"
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default Typography;
