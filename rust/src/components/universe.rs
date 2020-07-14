use super::{Colony, Coordinate, Field};
use js_sys::Math;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Universe {
    field: Field,
    colonies: Vec<Colony>,
}

impl Universe {
    fn check_cells(&mut self) {
        for colony in &mut self.colonies {
            colony.check_cells(&mut self.field);
        }
    }

    fn move_ants(&mut self) {
        for colony in &mut self.colonies {
            colony.move_ants(&mut self.field);
        }
    }
}

fn get_random_coordinate(size: i32) -> i32 {
    Math::round(Math::random() * size as f64) as _
}

#[wasm_bindgen]
impl Universe {
    pub fn get_field(&self) -> *const Field {
        &self.field
    }

    pub fn get_colonies(&self) -> *const Colony {
        self.colonies.as_ptr()
    }

    pub fn tick(&mut self) {
        self.check_cells();
        self.move_ants();
    }

    pub fn generate(
        field_width: i32,
        field_height: i32,
        colonies_count: i32,
        food_count: i32,
    ) -> Universe {
        let mut field = Field::new(field_width, field_height);

        let mut colonies = vec![];
        for _ in 0..colonies_count {
            let x = get_random_coordinate(field_width);
            let y = get_random_coordinate(field_height);
            colonies.push(Colony::new(Coordinate::new(x, y), 1000usize));
        }

        for _ in 0..food_count {
            loop {
                let x = get_random_coordinate(field_width);
                let y = get_random_coordinate(field_height);
                if field.get(x, y).is_obstacle {
                    continue;
                }
                field.place_food_by_pos(Coordinate::new(x, y));
                break;
            }
        }

        Universe { field, colonies }
    }
}
