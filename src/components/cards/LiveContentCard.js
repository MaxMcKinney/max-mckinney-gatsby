import React from 'react'
import styled from 'styled-components'
import {PulseRight} from '../Animations'

export default (props) => {
  return (
	<LiveContentCard>
		<LiveContentThumbnail thumb={props.thumbnail}/>
		<LiveContentInfo bg={props.thumbnail} themeColor={props.themeColor}>
			<p>{props.title}</p>
		</LiveContentInfo>
		<LiveContentButton href={props.url} themeColor={props.themeColor}> <i class="far fa-chevron-right"></i> </LiveContentButton>
	</LiveContentCard>
  )
}

const LiveContentCard = styled.div`
	display: grid;
	grid-template-columns: 22% 1fr 50px;
	border: 1px solid rgba(255,255,255,0.2);
	border-radius: 2px;
	overflow: hidden;
`;

const LiveContentThumbnail = styled.div`
	background-image: url(${props => props.thumb});
	background-size: cover;
	background-position: center;
`;

const LiveContentInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${props => props.bg});
	background-size: cover;
	background-position: center;

	p {
		padding-top: 48px;
        padding-bottom: 48px;
		font-weight: 600;
		font-size: 32px;
		text-align: center;
	}
	a {
		padding-bottom: 48px;
		color: ${props => props.themeColor};
		text-align: center;
	}
	a:hover {
		opacity: 0.7;
	}

	@media(max-width: 450px) {
		p {
			line-height: 36px;
		}
	}

`;

const LiveContentButton = styled.a`
	background-color: ${props => props.themeColor};
	color: #1e1e1e;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		opacity: 0.7;
	}

    &:hover svg {
        animation: ${PulseRight} 0.3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
`;
