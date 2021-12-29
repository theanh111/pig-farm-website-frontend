export const Team = (props) => {
    return (
        <div id="team" className="text-center">
            <div className="container">
                <div className="col-md-8 col-md-offset-2 section-title">
                    <h2>Các Thành Viên Trong Dự Án</h2>
                    <p>
                        Để thực hiện tốt nhiệm vụ của mình cần có kiến thức nhất định và khả năng quản lý tốt cùng với các kỹ năng tạo và
                        duy trì mối quan hệ tốt với các cá nhân và tổ chức.
                    </p>
                </div>
                <div id="row">
                    {props.data
                        ? props.data.map((d, i) => (
                              <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                                  <div className="thumbnail">
                                      <div>
                                          <img
                                              style={{ width: "250px", height: "250px", objectFit: "cover", display: "inline-block" }}
                                              src={d.img}
                                              alt="..."
                                              className="team-img"
                                          />
                                      </div>
                                      <div className="caption">
                                          <h4>{d.name}</h4>
                                          <p>{d.job}</p>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : "loading"}
                </div>
            </div>
        </div>
    );
};
