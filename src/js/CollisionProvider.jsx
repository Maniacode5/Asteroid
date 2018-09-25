import React, { Component, Fragment } from 'react';

import SAT from 'sat';

export default class CollisionProvider extends Component {
    componentWillReceiveProps ({ children, frame, allowedCollision }) {
        const refs = Object.values(this.refs);
        console.log(refs)

        if (frame !== this.props.frame && refs.length) {
            refs.forEach((child1, i) => {
                refs.forEach((child2, j) => {
                    if ((j > i) && allowedCollision.length) {
                        for(var x in allowedCollision) {
                            if ((child1 instanceof allowedCollision[x][0] && child2 instanceof allowedCollision[x][1]) || (child1 instanceof allowedCollision[x][1] && child2 instanceof allowedCollision[x][0])) {
                                if (SAT.testPolygonPolygon(child1.SATElement, child2.SATElement)) {
                                    child1.onCollision(child2);
                                    child2.onCollision(child1);
                                }
                            }
                        }
                    }
                })
            })
        }
    }

    render () {
        var index = 0;
        const children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                ref: index++
            });
        });

        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }
}
