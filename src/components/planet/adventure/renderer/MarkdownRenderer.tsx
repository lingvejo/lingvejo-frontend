import React from 'react';
import { Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return <Text><ReactMarkdown>{content}</ReactMarkdown></Text>;
};

export default MarkdownRenderer;
