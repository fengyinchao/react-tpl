import React, { PureComponent } from 'react';
import Table from 'components/Table';
import styles from 'styles/basicInfoPage.scss';
import { connect } from 'react-redux';
import { registerAction } from 'store/actions';
import PropTypes from 'prop-types';

class ConfigInfoPage extends PureComponent {
  getTableConfig(configs) {
    configs = configs || [{}];
    let tableTestConfig = {};
    let tableProdConfig = {};
    configs.forEach(config => {
      const { id, secret, expireTime, stages } = config;
      if (stages === 'sandbox') {
        // 测试环境
        tableTestConfig = {
          title: '测试环境',
          content: [
            {
              key: '企业 id',
              value: id,
              canEditable: false
            },
            {
              key: '企业 Secret',
              value: secret,
              canEditable: false
            },
            {
              key: '有效期至',
              value: expireTime,
              canEditable: false
            }
          ]
        };
      } else if (stages === 'production') {
        // 正式环境
        tableProdConfig = {
          title: '正式环境',
          content: [
            {
              key: '企业 id',
              value: id,
              canEditable: false
            },
            {
              key: '企业 Secret',
              value: secret,
              canEditable: false
            },
            {
              key: '有效期至',
              value: expireTime,
              canEditable: false
            }
          ]
        };
      }
    });

    return { testConfig: tableTestConfig, prodConfig: tableProdConfig };
  }
  render() {
    const { testConfig, prodConfig } = this.getTableConfig(this.props.configs);
    const hasConfig = testConfig.title || prodConfig.title;
    if (!hasConfig) {
      return <div className={styles.empty}>暂无配置</div>;
    }
    return (
      <div className={styles.container}>
        <Table config={testConfig} />
        <Table config={prodConfig} />
      </div>
    );
  }
}

ConfigInfoPage.propTypes = {
  configs: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    // 这里 user 是普通对象
    configs: state.getIn(['userInfo', 'user']).configs
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: params => dispatch(registerAction(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigInfoPage);
