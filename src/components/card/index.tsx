import type { ReactElement } from 'react';

import './style.scss';

interface CardProps {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    highlightSubtitle?: boolean;
    ornament?: ReactElement | null;
}

export function Card({ title, subtitle, content, image, highlightSubtitle, ornament }: CardProps) {
    return (
        <div className="card">
            <img className="card-image" src={image} alt={title} />
            <div className="card-title">{ title }</div>
            <p className={highlightSubtitle? 'card-subtitle hightlight' : 'card-subtitle'}>{ subtitle }</p>
            <span className="card-content">{ content }</span>
            {ornament}
        </div>
    );
}
