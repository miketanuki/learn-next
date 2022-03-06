import Head from "next/head";
import Layout from "../../components/Layout";
import Date from "../../components/date"
import { getAllPostIds, getPostData } from "../../lib/posts"; 
import utilStyles from '../../styles/utils.module.scss'


export default function Post({postData}:any) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        </Layout>
    )
}

// build時に作成するパスを指定する
export async function getStaticPaths(){
    const paths = getAllPostIds()
    console.log(paths);
    
    return {
        paths,
        // 存在しないURLにアクセスした際に404へ飛ばす
        fallback: false
    }
}

// コンテンツを取得しpropsにして渡す
// paramsはgetStaaticPahtsの返り値を受け取っとんか？要確認
export async function getStaticProps({params}:any){
    const postData = await getPostData(params.id)
    console.log(params);
    
    return {
        // getStaticPropsを使う際は必ずオブジェクト型にし、propsのキーを持ったオブジェクトを返すようにする
        props: {
            postData
        }
    }
}