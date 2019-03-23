import '../polyfills';

import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import RehypeReact from '../../../rehype-react';
import Layout from '../components/Layouts';

// Components
import PageHeader from '../components/PageHeader';
import ComponentCode from '../components/ComponentCode';
import CodeSnippet from '../components/CodeSnippet';
import ColorTable from '../components/ColorTable';
import GridDocumentation from '../components/GridDocumentation';

// Custom Markdown
import { ul, ol, PageIntro, FlexGroup } from '../components/markdown/Markdown';

const GITHUB_SOURCE_URL = 'https://github.com/WeConnect/ray/blob/master';
const HEADING_STYLE = {
  marginTop: '3rem'
};
/* eslint-disable react/prop-types */
const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: function h1({ children, ...props }) {
      return (
        <h1 {...props} style={HEADING_STYLE} className="ray-text--h1">
          {children}
        </h1>
      );
    },
    h2: function h2({ children, ...props }) {
      return (
        <h2 {...props} style={HEADING_STYLE} className="ray-text--h2">
          {children}
        </h2>
      );
    },
    h3: function h3({ children, ...props }) {
      return (
        <h3 {...props} style={HEADING_STYLE} className="ray-text--h3">
          {children}
        </h3>
      );
    },
    h4: function h4({ children, ...props }) {
      return (
        <h4 {...props} style={HEADING_STYLE} className="ray-text--h4">
          {children}
        </h4>
      );
    },
    h5: function h5({ children, ...props }) {
      return (
        <h5 {...props} style={HEADING_STYLE} className="ray-text--h5">
          {children}
        </h5>
      );
    },
    h6: function h6({ children, ...props }) {
      return (
        <h6 {...props} style={HEADING_STYLE} className="ray-text--h6">
          {children}
        </h6>
      );
    },
    p: function p({ children }) {
      return <p className="ray-text--body">{children}</p>;
    },
    a: function a({ children, ...props }) {
      const isExternal = props.href.startsWith('http');
      const additionalProps = isExternal
        ? {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        : null;
      return (
        <a {...props} {...additionalProps}>
          {children}
        </a>
      );
    },
    ul,
    ol,
    table: function table({ children, ...props }) {
      return (
        <table {...props} className="ray-table">
          {children}
        </table>
      );
    },
    blockquote: function blockquote({ children }) {
      return <blockquote className="ray-blockquote">{children}</blockquote>;
    },
    pre: CodeSnippet,
    'page-intro': PageIntro,
    'flex-group': FlexGroup,
    'color-table': ColorTable,
    component: ComponentCode,
    'grid-documentation': GridDocumentation
  }
}).Compiler;
/* eslint-enable react/prop-types */

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  const post = data.markdownRemark;

  const classNames = classnames('page-content ray-grid', {
    'page-content--component': post.frontmatter.label === 'Component'
  });

  const githubPath = post.fields.sourcePath
    ? `${GITHUB_SOURCE_URL}/${post.fields.sourcePath}`
    : null;

  return (
    <Layout>
      {post.frontmatter.title && (
        <PageHeader
          title={post.frontmatter.title}
          label={post.frontmatter.label}
          githubPath={githubPath}
        />
      )}

      <div className={classNames}>
        <div className="ray-grid__inner">
          <div className="ray-grid__cell ray-grid__cell--span-8-tablet ray-grid__cell--span-10-desktop">
            {renderAst(post.htmlAst)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query Query($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      htmlAst
      fields {
        slug
        path
        currentPage
        sourcePath
      }
      frontmatter {
        title
        label
      }
    }
  }
`;
