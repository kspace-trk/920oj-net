import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: '自己紹介',
    Svg: require('@site/static/img/undraw_profile_details_re_ch9r.svg').default,
    description: (
      <>
        職歴や保有スキル等を紹介しています。
      </>
    ),
    link: '/introduction',
  },
  {
    title: 'ドキュメント',
    Svg: require('@site/static/img/undraw_developer_activity_re_39tg.svg').default,
    description: (
      <>
        主に技術関連の備忘録やメモ等を掲載しています。
      </>
    ),
    link: '/docs/index',
  },
  {
    title: 'ブログ',
    Svg: require('@site/static/img/undraw_cat_8fgf.svg').default,
    description: (
      <>
        技術以外の記事を掲載しています。
      </>
    ),
    link: '/blog',
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <Btn children="Go!" color="#25c2a0" url={link}>Go!</Btn>
      </div>
    </div>
  );
}

function Btn ({children, color, url}) {
  return (
    <Link
      style={{
        backgroundColor: color,
        borderRadius: '20px',
        color: '#fff',
        padding: '10px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      to={url}
    >
      {children}
    </Link>
  )
}

export default function HomepageContents() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2>Site Contents</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
