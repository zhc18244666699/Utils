import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { DatePicker, Space, ConfigProvider, Button, Table, Form, Modal } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from "moment";
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';
import Icon, { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.scss';

const { RangePicker } = DatePicker;

interface IProps {
    children: React.ReactElement | React.ReactElement[];
    tabIndex: string;
}

const LaboratoryRevervationList: React.FC<IProps> = props => {
    const location = useLocation();
    const [form] = Form.useForm();
    // 表格行
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 表格列
    const [selectedColumnKey, setSelectedColumnKey] = useState(null);
    // 详情dialog展示状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 新增分组dialog展示状态
    const [detailInfo, setDetailInfo] = useState({});
    // datePicker查询时间
    const [searchTime, setSearchTime] = useState(null)
    // 一周时间列表
    const [weekList, setWeekList] = useState(new Array())
    // 选择的当前时间
    const [currentTime, setCurrentTime] = useState(moment(new Date()))
    // 虚拟当前时间
    const [virtuallyTime, setVirtuallyTime] = useState(moment(new Date()))
    // 表格loading状态
    const [loading, setLoading] = useState<boolean>(true)

    // 展示实验室详情弹框
    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    // 取消操作
    const handleCancel = () => {
        // 清空表单
        // form.resetFields();
        setIsModalOpen(false);
    };

    // 日期选择器change事件
    const handleDatePickerOnChange = (
        value: any,
    ) => {
        // 查询时间
        setSearchTime(value)
    };

    // 查询固定时间实验室预约情况
    const handleSearchClick = () => {
        if (!searchTime) return
        // 修改当前时间
        setCurrentTime(moment(searchTime))
        // 修改当前虚拟时间
        setVirtuallyTime(moment(searchTime))
        // 获取虚拟时间最近一周
        const newWeekList = handleAllWeek(moment(searchTime))
        setWeekList(newWeekList)
        // 查询后tableloading
        setLoading(true)
        handleTableLoadingHide()
    };

    useEffect(() => {
        // 获取当前时间最近一周
        const weekList = handleAllWeek(currentTime)
        setWeekList(weekList)
        handleTableLoadingHide()
    }, [])

    const handleTableLoadingHide = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    // 单元格点击事件
    const handleCellClick = (record: any) => {
        // 实验室详情信息
        // setDetailInfo(record)
        setDetailInfo({
            a: '1',
            b: '2'
        })
        // 展示弹框
        handleShowModal()
        console.log(record, '1231232131')
    }

    // 获取一周列表
    const handleAllWeek = (currentTime: any) => {
        let time = moment(currentTime).startOf('week') // 获取本周的起始日期
        let weekArr = []
        for(let i = 0; i < 7; i++) {
            let tempTime = moment(time).weekday(i)
            const date = moment(tempTime).date()
            const week = moment(tempTime).day()
            const month = moment(tempTime).format("YYYY-M")
            const day = moment(tempTime).format("YYYY-MM-DD")
            const ctime = moment(tempTime)
            const obj = {
                date, 
                week,
                month,
                day,
                ctime
            }
            weekArr.push(obj)
        }
        return weekArr
    }

    const columns: any = [
        {
            title: '',
            dataIndex: 'time',
            width: 140,
            onCell: (record: any, index: any, bb: any) => {
                return {
                    onClick: () => {
                        console.log(record, index, bb)
                    }, // 点击行
                }
            },
            render: (text: string, record: any) => (<div className='week-table-col'>{record.time}</div>)
        },
        {
            title: '周一',
            dataIndex: '1',
            width: 140,
            render: (text: string, record: any, index: number) =>{
                // 计算占多少个时间格 假如占用 2个
                // index 对应的是时间段
                const styleHeight = 2 * 55 + 'px'
                if (index === 0) {
                    return {
                        children: <div style={{ height: styleHeight }} onClick={handleCellClick.bind(this, record)} className='week-table-cell week-table-cell-notStart'>产品说明会</div>,
                    }
                }
            }
        },
        {
            title: '周二',
            width: 140,
            dataIndex: '2',
            render: (text: string, record: any, index: number) =>{
                const styleHeight = 2 * 55 + 'px'
                if (index === 4) {
                    return {
                        children: <div style={{ height: styleHeight }} onClick={handleCellClick.bind(this, record)} className='week-table-cell week-table-cell-notStart'>产品说明会</div>,
                    }
                }
            }
        },
        {
            title: '周三',
            width: 140,
            dataIndex: '3',
            render: (text: string, record: any, index: number) =>{
                const styleHeight = 3 * 55.5 + 'px'
                if (index === 2) {
                    return {
                        children: <div style={{ height: styleHeight }} onClick={handleCellClick.bind(this, record)} className='week-table-cell week-table-cell-over'>产品说明会</div>,
                    }
                }
                if (index === 7) {
                    return {
                        children: <div style={{ height: styleHeight }} onClick={handleCellClick.bind(this, record)} className='week-table-cell week-table-cell-notStart'>产品说明会</div>,
                    }
                }
            }
        },
        {
            title: '周四',
            width: 140,
            dataIndex: '4',
        },
        {
            title: '周五',
            width: 140,
            dataIndex: '5',
        },
        {
            title: '周六',
            width: 140,
            dataIndex: '6',
        },
        {
            title: '周日',
            width: 140,
            dataIndex: '7',
        }
    ];

    const timeList: any = [
        {
            time: '08:30-09:00'
        },
        {
            time: '09:00-09:30'
        },
        {
            time: '09:30-10:00'
        },
        {
            time: '10:00-10:30'
        },
        {
            time: '10:30-11:00'
        },
        {
            time: '11:00-11:30'
        },
        {
            time: '11:30-12:00'
        },
        {
            time: '12:00-12:30'
        },
        {
            time: '12:30-13:00'
        },
        {
            time: '13:00-13:30'
        },
        {
            time: '13:30-14:00'
        },
        {
            time: '14:00-14:30'
        },
        {
            time: '14:30-15:00'
        },
        {
            time: '15:00-15:30'
        },
        {
            time: '15:30-16:00'
        },
        {
            time: '16:00-16:30'
        },
        {
            time: '16:30-17:00'
        },
        {
            time: '17:00-17:30'
        }
    ]

    // 显示星期
    const handleWeekFormat = (week: number) => {
        let currentWeek: string;
        switch (week) {
            case 0:
                currentWeek = '周日'
                break;
            case 1:
                currentWeek = '周一'
                break;
            case 2:
                currentWeek = '周二'
                break;
            case 3:
                currentWeek = '周三'
                break;
            case 4:
                currentWeek = '周四'
                break;
            case 5:
                currentWeek = '周五'
                break;
            case 6:
                currentWeek = '周六'
                break;
            default: currentWeek = ''
        }
        return currentWeek;
    }
    // 当前日期样式
    const handleCurrentActive = (day: string) => {
        let className = 'week-bottom-number-num';
        const currentDay = moment(currentTime).format('YYYY-MM-DD')
        if (currentDay === day) {
            className = 'week-bottom-number-active week-bottom-number-num'
        }
        return className
    }

    // 选择日期
    const handleDayClick = (ctime: Date) => {
        setCurrentTime(moment(ctime))
        // 查询后tableloading
        setLoading(true)
        handleTableLoadingHide()
    }

    // 上一周or下一周
    const handleWeekOnChange = (type: string) => {
        let vTime;
        if (type === 'prev') {
            // 上一周
            vTime = moment(virtuallyTime).subtract(7, 'days')
        } else {
            // 下一周
            vTime = moment(virtuallyTime).add(7, 'days')
        }
        // 修改当前虚拟时间
        setVirtuallyTime(vTime)
        // 获取虚拟时间最近一周
        const weekList = handleAllWeek(vTime)
        setWeekList(weekList)
    }

    // 切换当前时间
    const handleDayOnChange = (type: string) => {
        let cTime;
        // 当前周最大日期
        const maxDate = Math.max(...weekList.map(item => item.date))
        // 当前周最小日期
        const minDate = Math.min(...weekList.map(item => item.date))
        if (type === 'prev') {
            // 上一天
            cTime = moment(currentTime).subtract(1, 'days')
            if (moment(cTime).date() < minDate) {
                handleWeekOnChange('prev')
            }
        } else {
            // 下一天
            cTime = moment(currentTime).add(1, 'days')
            if (moment(cTime).date() > maxDate) {
                handleWeekOnChange('next')
            }
        }
        // 修改当前时间
        setCurrentTime(cTime)
        // 修改当前虚拟时间
        setVirtuallyTime(cTime)
        // 获取虚拟时间最近一周
        const newWeekList = handleAllWeek(cTime)
        setWeekList(newWeekList)
    }

    // 今天按钮点击
    const handleTodayClick = () => {
        const cTime = moment(new Date())
        // 修改当前时间
        setCurrentTime(cTime)
        // 修改当前虚拟时间
        setVirtuallyTime(cTime)
        // 获取虚拟时间最近一周
        const newWeekList = handleAllWeek(cTime)
        setWeekList(newWeekList)
        setLoading(true)
        handleTableLoadingHide()
    }

    // 下周一
    const handleNextWeek = () => {
        const date = moment(currentTime);
        const dow = date.day();
        // 本周一
        const weekFirst = date.subtract(dow-1, 'days')
        // 下周一
        const nextWeekFirst = moment(weekFirst).subtract(-7, 'days')
        // 修改当前虚拟时间
        setVirtuallyTime(nextWeekFirst)
        // 修改当前时间
        setCurrentTime(nextWeekFirst)
        // 获取虚拟时间最近一周
        const weekList = handleAllWeek(nextWeekFirst)
        setWeekList(weekList)
        setLoading(true)
        handleTableLoadingHide()
    }

    return (
        <ConfigProvider locale={zhCN}>
            <div className="laboratory-revervation-list">
                <div className="revervation-list-wrapper">
                    <div className="revervation-list-title">
                        <div className="revervation-title-text">筛选列表</div>
                        <div className="revervation-operation">
                            <Space className='revervation-operation-search' size={16}>
                                <span>预选时间</span>
                                <DatePicker onChange={handleDatePickerOnChange} />
                                <Button style={{ borderRadius: '8px' }} type="primary" ghost onClick={handleSearchClick}>查询</Button>
                            </Space>
                            <Space size={32}>
                                <span><span className='revervation-status-notUsed revervation-status'></span>未使用</span>
                                <span><span className='revervation-status-Ended revervation-status'></span>已结束</span>
                                <span><span className='revervation-status-notStarted revervation-status'></span>未开始</span>
                            </Space>
                        </div>
                    </div>
                    <div className="revervation-table">
                        <div className="revervation-week">
                            <div className="week-top">
                                <div className="week-top-date">
                                    <LeftOutlined onClick={handleDayOnChange.bind(this, 'prev')} className='week-top-date-icon' />
                                    <span className='week-top-day'>{moment(currentTime).format('YYYY-MM-DD')}</span>
                                    <RightOutlined onClick={handleDayOnChange.bind(this, 'next')} className='week-top-date-icon' />
                                </div>
                                <div className="week-top-btn">
                                    <Button
                                        onClick={handleTodayClick}
                                        style={{ borderRadius: '8px', margin: '0 8px' }}
                                        disabled={moment(new Date()).format('YYYY-MM-DD') === moment(currentTime).format('YYYY-MM-DD')}
                                    >
                                        今天
                                    </Button>
                                    <Button onClick={handleNextWeek} style={{ borderRadius: '8px', margin: '0 8px' }}>下周一</Button>
                                </div>
                            </div>
                            <div className="week-bottom">
                                <div className="week-bottom-prev">
                                    <LeftOutlined onClick={handleWeekOnChange.bind(this, 'prev')} className='week-bottom-date-icon' />
                                </div>
                                <div className="week-bottom-middle">
                                    {
                                        weekList?.map((item) => {
                                            return (
                                                <div key={'time-' + item.day} className="week-bottom-number">
                                                    <span>{handleWeekFormat(item.week)}</span>
                                                    <span>{item.month}</span>
                                                    <span onClick={handleDayClick.bind(this, item.ctime)}>
                                                        <i className={handleCurrentActive(item.day)}>{item.date}</i>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="week-bottom-next">
                                    <RightOutlined onClick={handleWeekOnChange.bind(this, 'next')} className='week-bottom-date-icon' />
                                </div>
                            </div>
                        </div>
                        <Table
                            className='week-table-container'
                            columns={columns}
                            rowKey="time"
                            dataSource={timeList}
                            bordered
                            pagination={false}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};
export default LaboratoryRevervationList;
