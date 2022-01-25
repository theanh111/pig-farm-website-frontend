import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, Row, Col, message } from "antd";

import Loader from "../../Loader/Loader";
import { updatePig } from "../../../api/pig";

const EditPig = (props) => {
    const history = useNavigate();
    const [dataEdit, setDataEdit] = useState({});
    const [dataSubmit, setDataSubmit] = useState({});
    const { viewEditPig, closeDrawer, fetchData, pig, userCurrent } = props;
    const [viewLoader, setViewLoader] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [saveButton, setSaveButton] = useState(true);

    const onCloseDrawer = () => {
        closeDrawer();
    };

    const handleCloseConfirm = () => {
        showModal();
    };

    const handleCloseDrawer = () => {
        showModal();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onCloseDrawer();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSavePig = () => {
        if (dataSubmit) {
            if (dataSubmit.id !== null && dataSubmit.ma_so_ca_the !== "") {
                updatePigAPI(dataSubmit);
            }
        }
    };

    const updatePigAPI = async (pig) => {
        setViewLoader(true);
        await updatePig(pig)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật cá thể thành công");
                        setViewLoader(true);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            closeDrawer();
                            fetchData();
                        });
                    } else if (res.status == 400) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    } else if (res.status == 401) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    }
                }
            })
            .catch((err) => {
                alert("Hết phiên đăng nhập");
                history("/dang-nhap");
            });
        setViewLoader(false);
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    useEffect(() => {
        const fetchData2 = () => {
            setDataEdit({
                id: pig.id,
                ma_so_ca_the: pig.ma_so_ca_the,
                tuoi: pig.tuoi,
                nguoi_danh_gia: pig.nguoi_danh_gia,
                dia_diem_danh_gia: pig.dia_diem_danh_gia,
                ngay_danh_gia: pig.ngay_danh_gia,
                gioi_tinh: pig.gioi_tinh,
                nhan_trung_trang: pig.nhan_trung_trang,
                tai_meo: pig.tai_meo,
                mom: pig.mom,
                vanh_trang_quanh_mom: pig.vanh_trang_quanh_mom,
                mat: pig.mat,
                da_co_khoang_den: pig.da_co_khoang_den,
                khoang_den_phu: pig.khoang_den_phu,
                kieu_lung_bung: pig.kieu_lung_bung,
                chan: pig.chan,
                da_mat: pig.da_mat,
                kieu_duoi: pig.kieu_duoi,
                kieu_tai: pig.kieu_tai,
                huong_tai: pig.huong_tai,
                kieu_long: pig.kieu_long,
                loai_mau_long: pig.loai_mau_long,
                hinh_dang_dau: pig.hinh_dang_dau,
                trong_luong_co_the_kg: pig.trong_luong_co_the_kg,
                chieu_dai_dau_cm: pig.chieu_dai_dau_cm,
                chieu_dai_duoi_cm: pig.chieu_dai_duoi_cm,
                chieu_rong_nguc_cm: pig.chieu_rong_nguc_cm,
                chieu_cao_than_tai_chan_truoc_cm: pig.chieu_cao_than_tai_chan_truoc_cm,
                chieu_dai_co_the_cm: pig.chieu_dai_co_the_cm,
                chieu_dai_tai_cm: pig.chieu_dai_tai_cm,
                chieu_rong_than_tai_xuong_chau_cm: pig.chieu_rong_than_tai_xuong_chau_cm,
                chu_vi_co_chan_cm: pig.chu_vi_co_chan_cm,
                do_rong_dai_trang_vat_vai_cm: pig.do_rong_dai_trang_vat_vai_cm,
                so_bau_vu: pig.so_bau_vu,
                loai_con_giong: pig.loai_con_giong,
                so_con_trong_dan: pig.so_con_trong_dan,
                so_con_duc_trong_dan: pig.so_con_duc_trong_dan,
                so_con_cai_trong_dan: pig.so_con_cai_trong_dan,
                hinh_anh_1: pig.hinh_anh_1,
                hinh_anh_2: pig.hinh_anh_2,
                hinh_dang_long: pig.hinh_dang_long,
                do_dai_long: pig.do_dai_long,
                do_day_long: pig.do_day_long,
                pha_he: pig.pha_he,
                ngay_nhap: pig.ngay_nhap,
                trang_thai: pig.trang_thai,
                nguoi_cap_nhat: userCurrent,
            });
        };
        fetchData2();
        setDataSubmit({
            id: pig.id,
            ma_so_ca_the: pig.ma_so_ca_the,
            tuoi: pig.tuoi,
            nguoi_danh_gia: pig.nguoi_danh_gia,
            dia_diem_danh_gia: pig.dia_diem_danh_gia,
            ngay_danh_gia: pig.ngay_danh_gia,
            gioi_tinh: pig.gioi_tinh,
            nhan_trung_trang: pig.nhan_trung_trang,
            tai_meo: pig.tai_meo,
            mom: pig.mom,
            vanh_trang_quanh_mom: pig.vanh_trang_quanh_mom,
            mat: pig.mat,
            da_co_khoang_den: pig.da_co_khoang_den,
            khoang_den_phu: pig.khoang_den_phu,
            kieu_lung_bung: pig.kieu_lung_bung,
            chan: pig.chan,
            da_mat: pig.da_mat,
            kieu_duoi: pig.kieu_duoi,
            kieu_tai: pig.kieu_tai,
            huong_tai: pig.huong_tai,
            kieu_long: pig.kieu_long,
            loai_mau_long: pig.loai_mau_long,
            hinh_dang_dau: pig.hinh_dang_dau,
            trong_luong_co_the_kg: pig.trong_luong_co_the_kg,
            chieu_dai_dau_cm: pig.chieu_dai_dau_cm,
            chieu_dai_duoi_cm: pig.chieu_dai_duoi_cm,
            chieu_rong_nguc_cm: pig.chieu_rong_nguc_cm,
            chieu_cao_than_tai_chan_truoc_cm: pig.chieu_cao_than_tai_chan_truoc_cm,
            chieu_dai_co_the_cm: pig.chieu_dai_co_the_cm,
            chieu_dai_tai_cm: pig.chieu_dai_tai_cm,
            chieu_rong_than_tai_xuong_chau_cm: pig.chieu_rong_than_tai_xuong_chau_cm,
            chu_vi_co_chan_cm: pig.chu_vi_co_chan_cm,
            do_rong_dai_trang_vat_vai_cm: pig.do_rong_dai_trang_vat_vai_cm,
            so_bau_vu: pig.so_bau_vu,
            loai_con_giong: pig.loai_con_giong,
            so_con_trong_dan: pig.so_con_trong_dan,
            so_con_duc_trong_dan: pig.so_con_duc_trong_dan,
            so_con_cai_trong_dan: pig.so_con_cai_trong_dan,
            hinh_anh_1: pig.hinh_anh_1,
            hinh_anh_2: pig.hinh_anh_2,
            hinh_dang_long: pig.hinh_dang_long,
            do_dai_long: pig.do_dai_long,
            do_day_long: pig.do_day_long,
            pha_he: pig.pha_he,
            ngay_nhap: pig.ngay_nhap,
            trang_thai: pig.trang_thai,
            nguoi_nhap: pig.nguoi_nhap,
            nguoi_cap_nhat: userCurrent,
        });
    }, []);

    return (
        <>
            <>
                {viewLoader ? <Loader /> : null}
                <Modal
                    centered
                    okType="danger"
                    style={{ zIndex: 9 }}
                    title="Thông Báo"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Hủy"
                    okText="Đóng"
                >
                    <p style={{ fontSize: 18 }}>Bạn có chắc muốn thoát?</p>
                </Modal>
                <Drawer
                    title={
                        <>
                            <span>Sửa Cá Thể: </span>
                            <span style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{dataEdit.ma_so_ca_the}</span>
                        </>
                    }
                    width="85%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewEditPig}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button disabled={saveButton} onClick={handleSavePig} onClose={() => handleCloseConfirm()} type="primary">
                                Lưu
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="ma-so-ca-the" label="Mã Số Cá Thể">
                                    <span style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{dataEdit.ma_so_ca_the}</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="hinh-anh-1"
                                    label="Hình Ảnh 1"
                                    rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh 1" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập hình ảnh 1"
                                        defaultValue={dataEdit.hinh_anh_1}
                                        key={dataEdit.hinh_anh_1}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, hinh_anh_1: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="hinh-anh-2"
                                    label="Hình Ảnh 2"
                                    rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh 2" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập hình ảnh 1"
                                        defaultValue={dataEdit.hinh_anh_2}
                                        key={dataEdit.hinh_anh_2}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, hinh_anh_2: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item name="tuoi" label="Tuổi" rules={[{ required: true, message: "Xin vui lòng nhập tuổi" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập tuổi"
                                        defaultValue={dataEdit.tuoi}
                                        key={dataEdit.tuoi}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, tuoi: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="nguoi-danh-gia"
                                    label="Người Đánh Giá"
                                    rules={[{ required: true, message: "Xin vui lòng nhập tên người đánh giá" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập người đánh giá"
                                        defaultValue={dataEdit.nguoi_danh_gia}
                                        key={dataEdit.nguoi_danh_gia}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, nguoi_danh_gia: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="dia-diem-danh-gia"
                                    label="Địa Điểm Đánh Giá"
                                    rules={[{ required: true, message: "Xin vui lòng nhập địa điểm đánh giá" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập địa điểm đánh giá"
                                        defaultValue={dataEdit.dia_diem_danh_gia}
                                        key={dataEdit.dia_diem_danh_gia}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, dia_diem_danh_gia: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="ngay-danh-gia"
                                    label="Ngày Đánh Giá"
                                    rules={[{ required: true, message: "Xin vui lòng nhập tên ngày đánh giá" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập ngày đánh giá"
                                        defaultValue={dataEdit.ngay_danh_gia}
                                        key={dataEdit.ngay_danh_gia}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, ngay_danh_gia: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="gioi-tinh"
                                    label="Giới Tính"
                                    rules={[{ required: true, message: "Xin vui lòng nhập giới tính" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập giới tính"
                                        defaultValue={dataEdit.gioi_tinh}
                                        key={dataEdit.gioi_tinh}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, gioi_tinh: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="nhan-trung-trang"
                                    label="Nhân Trung Trắng"
                                    rules={[{ required: true, message: "Xin vui lòng nhập nhân trung trắng" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập nhân trung trắng"
                                        defaultValue={dataEdit.nhan_trung_trang}
                                        key={dataEdit.nhan_trung_trang}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, nhan_trung_trang: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="tai-meo"
                                    label="Tai Mèo"
                                    rules={[{ required: true, message: "Xin vui lòng nhập tai mèo" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập tai mèo"
                                        defaultValue={dataEdit.tai_meo}
                                        key={dataEdit.tai_meo}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, tai_meo: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="mom" label="Mõm" rules={[{ required: true, message: "Xin vui lòng nhập mõm" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập mõm"
                                        defaultValue={dataEdit.mom}
                                        key={dataEdit.mom}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, mom: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="vanh-trang-quanh-mom"
                                    label="Vành Trắng Quanh Mõm"
                                    rules={[{ required: true, message: "Xin vui lòng nhập vành trắng quanh mõm" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập vành trắng quanh mõm"
                                        defaultValue={dataEdit.vanh_trang_quanh_mom}
                                        key={dataEdit.vanh_trang_quanh_mom}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, vanh_trang_quanh_mom: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="mat" label="Mắt" rules={[{ required: true, message: "Xin vui lòng nhập mắt" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập mắt"
                                        defaultValue={dataEdit.mat}
                                        key={dataEdit.mat}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, mat: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="da-co-khoang-den"
                                    label="Da Có Khoang Đen"
                                    rules={[{ required: true, message: "Xin vui lòng nhập da có khoang đen" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập da có khoang đen"
                                        defaultValue={dataEdit.da_co_khoang_den}
                                        key={dataEdit.da_co_khoang_den}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, da_co_khoang_den: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="khoang-den-phu"
                                    label="Khoang Đen Phụ"
                                    rules={[{ required: true, message: "Xin vui lòng nhập khoang đen phụ" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập khoang đen phụ"
                                        defaultValue={dataEdit.khoang_den_phu}
                                        key={dataEdit.khoang_den_phu}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, khoang_den_phu: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="kieu-lung-bung"
                                    label="Kiểu Lưng Bụng"
                                    rules={[{ required: true, message: "Xin vui lòng nhập kiểu lưng bụng" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập kiểu lưng bụng"
                                        defaultValue={dataEdit.kieu_lung_bung}
                                        key={dataEdit.kieu_lung_bung}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, kieu_lung_bung: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="chan" label="Chân" rules={[{ required: true, message: "Xin vui lòng nhập chân" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập chân"
                                        defaultValue={dataEdit.chan}
                                        key={dataEdit.chan}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chan: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="da-mat" label="Da Mắt" rules={[{ required: true, message: "Xin vui lòng nhập da mắt" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập da mắt"
                                        defaultValue={dataEdit.da_mat}
                                        key={dataEdit.da_mat}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, da_mat: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="kieu-duoi"
                                    label="Kiểu Đuôi"
                                    rules={[{ required: true, message: "Xin vui lòng nhập kiểu đuôi" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập kiểu đuôi"
                                        defaultValue={dataEdit.kieu_duoi}
                                        key={dataEdit.kieu_duoi}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, kieu_duoi: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="kieu-tai"
                                    label="Kiểu Tai"
                                    rules={[{ required: true, message: "Xin vui lòng nhập kiểu tai" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập kiểu tai"
                                        defaultValue={dataEdit.kieu_tai}
                                        key={dataEdit.kieu_tai}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, kieu_tai: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="huong-tai"
                                    label="Hướng Tai"
                                    rules={[{ required: true, message: "Xin vui lòng nhập hướng tai" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập hướng tai"
                                        defaultValue={dataEdit.huong_tai}
                                        key={dataEdit.huong_tai}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, huong_tai: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="kieu-long"
                                    label="Kiểu Lông"
                                    rules={[{ required: true, message: "Xin vui lòng nhập lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập kiểu lông"
                                        defaultValue={dataEdit.kieu_long}
                                        key={dataEdit.kieu_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, kieu_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="loai-mau-long"
                                    label="Loại Màu Lông"
                                    rules={[{ required: true, message: "Xin vui lòng nhập loại màu lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập loại màu lông"
                                        defaultValue={dataEdit.loai_mau_long}
                                        key={dataEdit.loai_mau_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, loai_mau_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="hinh-dang-dau"
                                    label="Hình Dạng Đầy"
                                    rules={[{ required: true, message: "Xin vui lòng nhập hình dạng lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập hình dạng lông"
                                        defaultValue={dataEdit.hinh_dang_long}
                                        key={dataEdit.hinh_dang_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, hinh_dang_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="trong-luong-co-the-kg"
                                    label="Trong Lượng Cơ Thể (kg)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập trọng lượng cơ thể" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập trọng lượng cơ thể"
                                        defaultValue={dataEdit.trong_luong_co_the_kg}
                                        key={dataEdit.trong_luong_co_the_kg}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, trong_luong_co_the_kg: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-dai-dau-cm"
                                    label="Chiều Dài Đầu (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều dài đầu" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều dài đầu"
                                        defaultValue={dataEdit.chieu_dai_dau_cm}
                                        key={dataEdit.chieu_dai_dau_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_dai_dau_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-dai-duoi-cm"
                                    label="Chiều Dài Đuôi (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều dài đuôi" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều dài đuôi"
                                        defaultValue={dataEdit.chieu_dai_duoi_cm}
                                        key={dataEdit.chieu_dai_duoi_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_dai_duoi_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-rong-nguc-cm"
                                    label="Chiều Rộng Ngực (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều rộng ngực" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều rộng ngực"
                                        defaultValue={dataEdit.chieu_rong_nguc_cm}
                                        key={dataEdit.chieu_rong_nguc_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_rong_nguc_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-cao-than-tai-chan-truoc-cm"
                                    label="Chiều Cao Thân Tại Chân Trước (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều cao thân tại chân trước" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều cao thân tại chân trước"
                                        defaultValue={dataEdit.chieu_cao_than_tai_chan_truoc_cm}
                                        key={dataEdit.chieu_cao_than_tai_chan_truoc_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_cao_than_tai_chan_truoc_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-dai-co-the-cm"
                                    label="Chiều Dài Cơ Thể (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều dài cơ thể" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều dài cơ thể"
                                        defaultValue={dataEdit.chieu_dai_co_the_cm}
                                        key={dataEdit.chieu_dai_co_the_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_dai_co_the_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-dai-tai-cm"
                                    label="Chiều Dài Tai (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều dài tai" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều dài tai"
                                        defaultValue={dataEdit.chieu_dai_tai_cm}
                                        key={dataEdit.chieu_dai_tai_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_dai_tai_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="chieu-rong-than-tai-xuong-chau-cm"
                                    label="Chiều Rộng Thân Tại Xương Chậu (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chiều rộng thân tại xương chậu" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chiều rộng thân tại xương chậu"
                                        defaultValue={dataEdit.chieu_rong_than_tai_xuong_chau_cm}
                                        key={dataEdit.chieu_rong_than_tai_xuong_chau_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chieu_rong_than_tai_xuong_chau_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="chu-vi-co-chan-cm"
                                    label="Chu Vi Cổ Chân (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập chu vi cổ chân" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập chu vi cổ chân"
                                        defaultValue={dataEdit.chu_vi_co_chan_cm}
                                        key={dataEdit.chu_vi_co_chan_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, chu_vi_co_chan_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="do-rong-dai-trang-vat-vai-cm"
                                    label="Độ Rộng Dải Trắng Vắt Vai (cm)"
                                    rules={[{ required: true, message: "Xin vui lòng nhập độ rộng dải trắng vắt vai" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập độ rộng dải trắng vắt vai"
                                        defaultValue={dataEdit.do_rong_dai_trang_vat_vai_cm}
                                        key={dataEdit.do_rong_dai_trang_vat_vai_cm}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, do_rong_dai_trang_vat_vai_cm: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="so-bau-vu"
                                    label="Số Bầu Vú"
                                    rules={[{ required: true, message: "Xin vui lòng nhập số bầu vú" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập số bầu vú"
                                        defaultValue={dataEdit.so_bau_vu}
                                        key={dataEdit.so_bau_vu}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, so_bau_vu: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="loai-con-giong"
                                    label="Loại Con Giống"
                                    rules={[{ required: true, message: "Xin vui lòng nhập loại con giống" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập loại con giống"
                                        defaultValue={dataEdit.loai_con_giong}
                                        key={dataEdit.loai_con_giong}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, loai_con_giong: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="so-con-trong-dan"
                                    label="Số Con Trong Đàn"
                                    rules={[{ required: true, message: "Xin vui lòng nhập số con trong đàn" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập số con trong đàn"
                                        defaultValue={dataEdit.so_con_trong_dan}
                                        key={dataEdit.so_con_trong_dan}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, so_con_trong_dan: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="so-con-duc-trong-dan"
                                    label="Số Con Đực Trong Đàn"
                                    rules={[{ required: true, message: "Xin vui lòng nhập số con đực trong đàn" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập số con đực trong đàn"
                                        defaultValue={dataEdit.so_con_duc_trong_dan}
                                        key={dataEdit.so_con_duc_trong_dan}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, so_con_duc_trong_dan: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="so-con-cai-trong-dan"
                                    label="Số Con Cái Trong Đàn"
                                    rules={[{ required: true, message: "Xin vui lòng nhập số con cái trong đàn" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        placeholder="Nhập số con cái trong đàn"
                                        defaultValue={dataEdit.so_con_cai_trong_dan}
                                        key={dataEdit.so_con_cai_trong_dan}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, so_con_cai_trong_dan: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    name="hinh-dang-long"
                                    label="Hình Dạng Lông"
                                    rules={[{ required: true, message: "Xin vui lòng nhập hình dạng lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập hình dạng lông"
                                        defaultValue={dataEdit.hinh_dang_long}
                                        key={dataEdit.hinh_dang_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, hinh_dang_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="do-dai-long"
                                    label="Độ Dài Lông"
                                    rules={[{ required: true, message: "Xin vui lòng nhập độ dài lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập độ dài lông"
                                        defaultValue={dataEdit.do_dai_long}
                                        key={dataEdit.do_dai_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, do_dai_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="do-day-long"
                                    label="Độ Dày Lông"
                                    rules={[{ required: true, message: "Xin vui lòng nhập độ dày lông" }]}
                                >
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập độ dày lông"
                                        defaultValue={dataEdit.do_day_long}
                                        key={dataEdit.do_day_long}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, do_day_long: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="pha-he" label="Phả Hệ" rules={[{ required: true, message: "Xin vui lòng nhập phả hệ" }]}>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Nhập phả hệ"
                                        defaultValue={dataEdit.pha_he}
                                        key={dataEdit.pha_he}
                                        onChange={({ target: { value } }) => {
                                            setSaveButton(false);
                                            setDataSubmit({ ...dataSubmit, pha_he: value });
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default EditPig;
