use super::Coordinate;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(PartialEq, Eq, Debug, Clone)]
pub struct Cell {
    pub position: Coordinate,
    pub pheromones_count: i32,
    pub food_count: i32,
    pub ants_count: i32,
    pub is_obstacle: bool,
}

#[wasm_bindgen]
impl Cell {
    pub fn size_in_bytes() -> usize {
        std::mem::size_of::<Cell>()
    }
}

impl Cell {
    pub fn new(position: Coordinate) -> Cell {
        Cell {
            position,
            pheromones_count: 0,
            food_count: 0,
            is_obstacle: false,
            ants_count: 0,
        }
    }

    pub fn new_ex(position: Coordinate, is_obstacle: bool) -> Cell {
        Cell {
            position,
            pheromones_count: 0,
            food_count: 0,
            is_obstacle,
            ants_count: 0,
        }
    }

    #[inline(always)]
    pub fn get_attraction(&self) -> i32 {
        10 + self.pheromones_count + self.food_count
    }

    #[inline(always)]
    pub fn distance_to(&self, other: &Cell) -> f32 {
        self.position.distance_to(other.position)
    }

    #[inline(always)]
    pub fn tick(&mut self) {
        if self.pheromones_count > 0 {
            self.pheromones_count -= 1;
        }
    }
}
