const { Activity, Repository } = require("../scripts/index");

describe("demo", function () {
  it("Este test debe pasar siempre", function () {
    expect(4 + 2).toBe(6);
  });
});

describe("Activity Class Testing", function () {
  it("Activity debe tener una funcion constructora", function () {
    expect(Activity.constructor).toBeDefined();
  });

  it("Activity debe ser capaz de crear un objeto Actividad", function () {
    const id = Math.random() * 100 + 1;
    const title = "Mi titulo";
    const desc = "Mi Descripcion";
    const imgUrl = "miUrl.com";
    const mockActivity = new Activity(id, title, desc, imgUrl);

    expect(typeof mockActivity).toBe("object");
    expect(Object.keys(mockActivity).length).toBe(4);
    expect(Object.values(mockActivity).length).toBe(4);
  });
});

describe("Repository Class Testing", function () {
  it("Repository debe inicializarse con la propiedad 'activities' como un array vacio", function () {
    const mockRepo = new Repository();

    expect(mockRepo.getAllActivities()).toEqual([]);
  });

  it("Repository debe ser capaz de crear una instancia de Activity y asignarle un id", function () {
    const mockRepo = new Repository();
    const title = "Mi titulo";
    const description = "Mi Descripcion";
    const imgUrl = "miUrl.com";

    mockRepo.createActivity({ title, description, imgUrl });

    const activity1 = mockRepo.getAllActivities()[0];

    expect(typeof mockRepo.getAllActivities()[0]).toBe("object");
    expect(Object.values(activity1)[0]).toEqual(1);
  });

  it("Repository debe ser capaz de borrar actividades y actualizar el id del resto de actividades", function () {
    const mockRepo = new Repository();
    const title = "Mi titulo";
    const description = "Mi Descripcion";
    const imgUrl = "miUrl.com";

    mockRepo.createActivity({ title, description, imgUrl });
    mockRepo.createActivity({ title, description, imgUrl });
    mockRepo.createActivity({ title, description, imgUrl });

    expect(mockRepo.getAllActivities().length).toBe(3)

    const activity2 = mockRepo.getAllActivities()[1];
    const activity3 = mockRepo.getAllActivities()[2];

    mockRepo.deleteActivity(Object.values(activity2)[0])

    expect(mockRepo.getAllActivities().length).toBe(2)
    expect(Object.values(activity3)[0]).toBe(2)
  });
});
