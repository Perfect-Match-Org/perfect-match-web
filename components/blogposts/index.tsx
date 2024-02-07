import React from 'react';

const componentFiles = ['sampleinterview', 'samplepost'];

const Blogposts: React.FC = () => {
    return (
        <div className="pr-4" style={{ paddingRight: '15%', paddingLeft: '15%' }}>
            {componentFiles.map((componentName, index) => {
                const DynamicComponent = React.lazy(
                    () => import('@/components/blogposts/posts/' + componentName + '.tsx'),
                );

                return <DynamicComponent key={index} />;
            })}
        </div>
    );
};

export default Blogposts;
