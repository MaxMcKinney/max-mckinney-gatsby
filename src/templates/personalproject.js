import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from "gatsby"
import Img from "gatsby-image"

import PageHeaderTitle from '../components/page/PageHeaderTitle'
import PageHeaderSubtitle from '../components/page/PageHeaderSubtitle'
import AppStoreButton from '../components/buttons/AppStoreButton'
import GithubButton from '../components/buttons/GithubButton'
import YouTubeButton from '../components/buttons/YouTubeButton'

import {fadeInDown} from '../animations/m-styled-animations'


const SideProjectsPage = ({data}) => (

    <React.Fragment>

    <Helmet title={data.site.siteMetadata.title + ' | ' + data.personal.frontmatter.title}>
            <meta name="description" content={data.personal.frontmatter.description} />
            <meta name="image" content={data.site.siteMetadata.siteUrl + data.personal.frontmatter.image.childImageSharp.fluid.src}/>
            <meta itemprop="name" content={data.site.siteMetadata.title + ' | ' + data.personal.frontmatter.title}/>
            <meta itemprop="description" content={data.personal.frontmatter.description}/>
            <meta itemprop="image" content={data.site.siteMetadata.siteUrl + data.personal.frontmatter.image.childImageSharp.fluid.src}/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:title" content={data.site.siteMetadata.title + ' | ' + data.personal.frontmatter.title}/>
            <meta name="twitter:description" content={data.personal.frontmatter.description}/>
            <meta name="twitter:site" content="@madmaxmckinney"/>
            <meta name="twitter:image" content={data.site.siteMetadata.siteUrl + data.personal.frontmatter.image.childImageSharp.fluid.src}/>

            <meta name="og:title" content={data.site.siteMetadata.title + ' | ' + data.personal.frontmatter.title}/>
            <meta name="og:description" content={data.personal.frontmatter.description}/>
            <meta name="og:image" content={data.site.siteMetadata.siteUrl + data.personal.frontmatter.image.childImageSharp.fluid.src}/>
            <meta name="og:url" content={data.site.siteMetadata.siteUrl + data.personal.fields.slug}/>
            <meta name="og:site_name" content="Max McKinney"/>

        </Helmet>

    <PageGrid>


        <ProjectImg fluid={data.personal.frontmatter.image.childImageSharp.fluid} />
        <PersonalPageHeaderTitle>{data.personal.frontmatter.title}</PersonalPageHeaderTitle>
        <PageHeaderSubtitle className="text-xl">{data.personal.frontmatter.description}</PageHeaderSubtitle>

        <ButtonHStack>
        {data.personal.frontmatter.appStoreUrl && 
            <AppStoreButton href={data.personal.frontmatter.appStoreUrl}><i class="fab fa-app-store"></i>View on App Store</AppStoreButton>
        }
        {data.personal.frontmatter.githubUrl && 
            <GithubButton href={data.personal.frontmatter.githubUrl}><i class="fab fa-github"></i> View on Github</GithubButton>
        }
        {data.personal.frontmatter.youtubeUrl && 
            <YouTubeButton href={data.personal.frontmatter.youtubeUrl}><i class="fab fa-youtube"></i> View on YouTube</YouTubeButton>
        }
        </ButtonHStack>

        <Content className="prose prose-lg max-w-none text-white" dangerouslySetInnerHTML={{ __html: data.personal.html }} />

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

const ProjectImg = styled(Img)`
    width: 100px;
    height: 100px;
    margin-bottom: 16px;

    margin-top: 170px;
    border-radius: 24px;

    animation: ${fadeInDown} 0.8s;
`

const ButtonHStack = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
    grid-gap: 16px;
    justify-items: flex-start;

    margin-top: 32px;

    animation: ${fadeInDown} 1.6s;
`

const PersonalPageHeaderTitle = styled(PageHeaderTitle)`
    max-width: 100%;
`

const Content = styled.div`
    margin-top: 64px;

    animation: ${fadeInDown} 2s;

    img {
        border-radius: 2px;
    }

    p {
        opacity: 0.85;
    }
`

export default SideProjectsPage

export const query = graphql`
query PersonalProjectBySlug($slug: String!) {
    site {
        siteMetadata {
            title
            siteUrl
        }
    }
    personal: markdownRemark(fields: { slug: { eq: $slug } }) {
        frontmatter {
            title
            description
            locationText
            image {
              childImageSharp {
                  fixed {
                      src
                  }
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            appStoreUrl
            githubUrl
            youtubeUrl
        }
        html
        fields {
            slug
        }
    }
}
`