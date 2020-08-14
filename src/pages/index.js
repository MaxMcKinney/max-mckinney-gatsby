import React from 'react'
import { graphql } from "gatsby"
import styled, { keyframes } from 'styled-components'
import ProjectCard from '../components/ProjectCard';
import HeaderPill from '../components/HeaderPill'

import {fadeInDown} from './../animations/m-styled-animations'

const getFilterActionButtons = () => {
    return document.querySelectorAll('#FilterContainer span');
}

const getFilterPortfolioItems = () => {
    return document.querySelectorAll('[data-filter]');
}

const clearFilterItemsActive = () => {
    let items = getFilterActionButtons();
    items.forEach(item => {
        item.classList.remove('active');
    })

    let portfolioItems = getFilterPortfolioItems();
    portfolioItems.forEach(item => {
        item.classList.remove('active');
    })
}

/**
 * Filters the design AND dev portfolio items
 *
 */
const filterClickBoth = () => {
    let portfolioItems = document.querySelectorAll('[data-filter]');

    clearFilterItemsActive();
    document.querySelector('#FilterItemAll').classList.add('active');

    setTimeout(() => {
        portfolioItems.forEach(item => {
            item.classList.add('active');
        })
    }, 50)
}

/**
 * Filters the design portfolio items, anything that contains "design" using *
 *
 */
const filterClickDesign = () => {
    let portfolioItemsDesign = document.querySelectorAll('[data-filter*="Design"]')

    clearFilterItemsActive();
    document.querySelector('#FilterItemDesign').classList.add('active');

    setTimeout(() => {
        portfolioItemsDesign.forEach(item => {
            item.classList.add('active');
        })
    }, 50)
}

/**
 * Filters the dev portfolio items, anything that contains "development" using *
 *
 */
const filterClickDev = () => {
    let portfolioItemsDev = document.querySelectorAll('[data-filter*="Development"]')

    clearFilterItemsActive();
    document.querySelector('#FilterItemDev').classList.add('active');

    setTimeout(() => {
        portfolioItemsDev.forEach(item => {
            item.classList.add('active');
        })
    }, 50)
}

const IndexPage = ({data}) => (
  <React.Fragment>
	  <PageGrid>

		<HeaderTitle>UI/UX Designer, <br/> Frontend Developer</HeaderTitle>
		<HeaderSubtitle>I’m <HeaderPill showProfile title="Max McKinney" /> currently working full-time in ATX. <br/> My background is in <HeaderPill type="computer" title="Computer Science" /> and <HeaderPill type="uiux" title="UI/UX Design" />. I have a passion for <HeaderPill type="problem" title="Creative Problem Solving" />. <br/> I build cars on the side as well.</HeaderSubtitle>

        <FilterContainer id="FilterContainer">
            <span className="active" onClick={filterClickBoth} id="FilterItemAll">ALL</span>
            <span onClick={filterClickDesign} id="FilterItemDesign"><i className="far fa-ruler-triangle"></i> DESIGN</span>
            <span onClick={filterClickDev} id="FilterItemDev"><i className="far fa-brackets-curly"></i>  DEVELOPMENT</span>
        </FilterContainer>

		<ProjectCardGrid>
			{data.allMarkdownRemark.edges.map(({node}) => (
				<ProjectCard data={node} key={node.key}></ProjectCard>
			))}
		</ProjectCardGrid>

	</PageGrid>
  </React.Fragment>
)

const PageGrid = styled.div`
	display: grid;
	grid-template-columns: [start] minmax(24px, 1fr) [center] minmax(auto, 1100px) [end] minmax(24px, 1fr);
	& > * {
		grid-column: center;
	}
`

const HeaderTitle = styled.h1`
	font-size: 36px;
	margin-bottom: 24px;
	max-width: 400px;
	margin-top: 170px;
	color: white;
    font-weight: 600;
    line-height: 50px;
	animation: ${fadeInDown} 1s;
	@media(max-width: 425px) {
		margin-top: 130px;
	}
`;

const HeaderSubtitle = styled.h3`
	margin-bottom: 170px;
	max-width: 640px;
	font-size: 21px;
	color: #ffffff;
	font-weight: normal;
	line-height: 34px;
	animation: ${fadeInDown} 1.5s;
	@media(max-width: 425px) {
		margin-bottom: 110px;
    }
`;

const ProjectCardGrid = styled.div`
	display: grid;
    min-height: 800px;
	grid-template-columns: 1fr;
	grid-gap: 110px;
    align-items: flex-start;
	animation: ${fadeInDown} 2.2s;
	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
`;

const appearAnimLeft = keyframes`
    from {
        transform: scale(0.8);
        transform: translateX(10px);
        opacity: 0;
    }
    to {
        transform: scale(1);
        transform: translateX(0px);
        opacity: 1;
    }
`

const appearAnimRight = keyframes`
    from {
        transform: scale(0.8);
        transform: translateX(-10px);
        opacity: 0;
    }
    to {
        transform: scale(1);
        transform: translateX(0px);
        opacity: 1;
    }
`

const FilterContainer = styled.div`
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 24px;
    justify-content: flex-end;
    align-items: center;
    animation: ${fadeInDown} 1.7s;
    margin-bottom: 48px;

    span {
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: bold;
        letter-spacing: 1px;
        color: #C3C3C3;
        margin: 0;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            opacity: 0.8;
        }
    }
    
    span.active {
        color: white;
    }
    span.active::before {
        content:'[';
        display: inline-block;
        padding-right: 6px;
        color: #C3C3C3;
        transition: all 0.3s;
        animation: ${appearAnimLeft} 0.3s;
    }
    span.active::after {
        content:']';
        display: inline-block;
        padding-left: 6px;
        color: #C3C3C3;
        transition: all 0.3s;
        animation: ${appearAnimRight} 0.3s;
    }
`;

export default IndexPage

export const query = graphql`
query ProjectQuery {
	allMarkdownRemark(sort: {fields: [frontmatter___sortDate], order: DESC}) {
		edges {
		  node {
			fields {
				slug
			}
			frontmatter {
			  title
			  projectShortBrief
			  themeColor
			  accentColor
			  image {
				childImageSharp {
				  fluid(maxWidth: 900) {
					...GatsbyImageSharpFluid
				  }
				}
              }
              thumb {
				childImageSharp {
				  fluid(maxWidth: 900) {
					...GatsbyImageSharpFluid
				  }
				}
              }
              categories
			}
		  }
		}
	  }
  }
`