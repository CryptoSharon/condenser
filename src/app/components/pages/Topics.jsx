import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Topics extends React.Component {
    static propTypes = {
        categories: React.PropTypes.object.isRequired,
        order: React.PropTypes.string,
        current: React.PropTypes.string,
        className: React.PropTypes.string,
        compact: React.PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        const res =
            this.props.categories !== nextProps.categories ||
            this.props.current !== nextProps.current ||
            this.props.order !== nextProps.order ||
            this.state !== nextState;
        return res;
    }

    handleChange = (selectedOption) => {
        browserHistory.push(selectedOption.value)
    }

    render() {
        const {
            props: { order, current, compact, className, username },
        } = this;
        let categories = this.props.categories.get('trending');
        categories = categories.take(50);
        const cn = 'Topics' + (className ? ` ${className}` : '');
        const currentValue = `/${order}/${current}`;
        const selected =
            current === 'feed' ? `/@${username}/feed` : currentValue;
        const myFeed = username && (
            <option key={'feed'} value={`/@${username}/feed`}>
                {tt('g.my_feed')}
            </option>
        );

        const opts = categories.map(cat => {
            const link = order ? `/${order}/${cat}` : `/${cat}`;
            return (
                {value: link, label: cat}
            );
        }).toJS();
        debugger
        if (compact) {
            return (
                <span>
                    <Select
                        name="form-field-name"
                        value={selected}
                        onChange={this.handleChange}
                        options={opts}
                    />
                    <select
                        className={cn}
                        onChange={e => browserHistory.push(e.target.value)}
                        value={selected}
                    >
                        <option key={'*'} value={'/' + order}>
                            {tt('g.all_tags')}
                        </option>
                        {myFeed}
                        {categories.map(cat => {
                            const link = order ? `/${order}/${cat}` : `/${cat}`;
                            return (
                                <option key={cat} value={link}>
                                    {cat}
                                </option>
                            );
                        })}
                    </select>
                </span>
            );
        }

        categories = categories.map(cat => {
            const link = order ? `/${order}/${cat}` : `/hot/${cat}`;
            return (
                <li className="c-sidebar__list-item" key={cat}>
                    <Link
                        to={link}
                        className="c-sidebar__link"
                        activeClassName="active"
                    >
                        {cat}
                    </Link>
                </li>
            );
        });

        return (
            <div className="c-sidebar__module">
                <div className="c-sidebar__header">
                    <Link
                        to={'/' + order}
                        className="c-sidebar__h3"
                        activeClassName="active"
                    >
                        {tt('g.all_tags')}
                    </Link>
                </div>
                <div className="c-sidebar__content">
                    <ul className="c-sidebar__list">
                        {categories}
                        <li className="c-sidebar__link">
                            <Link
                                className="c-sidebar__link c-sidebar__link--emphasis"
                                to={`/tags`}
                            >
                                {tt('g.show_more_topics')}..
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    categories: state.global.get('tag_idx'),
}))(Topics);
