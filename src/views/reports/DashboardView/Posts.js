import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import fillYears from '../../../utils/fillYears';
import PropTypes from 'prop-types';
import StockedChart from '../../../graphs/stocked';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Posts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [labels, setLabels] = useState([]);
  const { reply, published, dates } = rest;
  useEffect(() => {
    const total_published_replies = fillYears(reply.total_published_replies, { total_count: 0 }, dates, 'published_on').map((t) => t.total_count);
    const total_unpublished_replies = fillYears(reply.total_unpublished_replies, { total_count: 0 }, dates, 'published_on').map((t) => t.total_count);

    const total_published = fillYears(reply.total_published, { created_count: 0 }, dates, 'published_on').map((t) => t.created_count);
    const total_unpublished = fillYears(reply.total_unpublished, { created_count: 0 }, dates, 'published_on').map((t) => t.created_count);

    const label = fillYears(reply.total_unpublished, { created_count: 0 }, dates, 'published_on').map((t) => t.published_on);

    const post = [
      { name: 'Published Posts', data: total_published },
      { name: 'Unpublished Posts', data: total_unpublished },
      { name: 'Published Replys', data: total_published_replies },
      { name: 'Unpublished Replys', data: total_unpublished_replies },
    ];
    setPosts(post);
    setLabels(label);
  }, [reply, published, dates]);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Posts" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <StockedChart data={posts} labels={labels} />
        </Box>

      </CardContent>
    </Card>
  );
};

Posts.propTypes = {
  className: PropTypes.string
};

export default Posts;
