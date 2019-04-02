import React, { Component } from 'react';
import './BackTop.scss';

class BackTop extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentDidMount() {
        //window 不可用 坑
        document.body.addEventListener( 'scroll', () => {
            let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
            if ( currentTop > 400 ) {
                this.setState( {
                    show: true
                } )
            } else {
                this.setState( {
                    show: false
                } )
            }
        } );
    }

    scrollTop() {
        let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
        if ( currentTop > 0 ) {
            //window.scrollTo()  没有效果 （坑）
            document.body.scrollTo( {
                top: 0,
                behavior: 'smooth',
            } );
        }
    }

    render() {
        const { show } = this.state;
        return (
            <>
                {
                    show &&
                    <div className='BackTop' onClick={ () => this.scrollTop() } >
                        <a href="javascript:;" className='BackTop-icon'>
                            <i className="fa fa-long-arrow-up" />
                        </a>
                    </div>
                }
            </>

        );
    }
}

export default BackTop;