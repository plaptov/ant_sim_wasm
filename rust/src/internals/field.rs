use crate::internals::cell::*;
use crate::internals::coordinate::*;
use js_sys::Math;
use std::fmt;
use std::ops::IndexMut;
use wasm_bindgen::prelude::*;

/*

Field store cells in one-dimensional array in folowing order:
width = 4, height = 3
ind [x,y]
0   [0,0]
1   [0,1]
2   [0,2]
3   [1,0] 1*height + 0
4   [1,1]
5   [1,2] 1*height + 2
6   [2,0]
7   [2,1]
8   [2,2]
9   [3,0]
10  [3,1] 3*height + 1
11  [3,2]

*/

#[wasm_bindgen]
pub struct Field {
    width: i32,
    height: i32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Field {
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn width(&self) -> i32 {
        self.width
    }

    pub fn height(&self) -> i32 {
        self.height
    }

    pub fn get_cell_copy(&self, x: i32, y: i32) -> Cell {
        self.get(x, y).clone()
    }

    pub fn new(width: i32, height: i32) -> Field {
        let mut cells = Vec::new();
        for x in 0..width {
            for y in 0..height {
                let is_obstacle = Math::random() < 0.2;
                cells.push(Cell::new_ex(Coordinate::new(x, y), is_obstacle));
            }
        }
        Field {
            width,
            height,
            cells,
        }
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl Field {
    pub const fn get_cells(&self) -> &Vec<Cell> {
        &self.cells
    }

    #[inline(always)]
    const fn get_index_in_vec(&self, x: i32, y: i32) -> usize {
        (x * self.height + y) as usize
    }

    #[inline(always)]
    pub fn get(&self, x: i32, y: i32) -> &Cell {
        &self.cells[self.get_index_in_vec(x, y)]
    }

    #[inline(always)]
    pub fn get_mut(&mut self, x: i32, y: i32) -> &mut Cell {
        self.cells.index_mut(self.get_index_in_vec(x, y))
    }

    #[inline(always)]
    pub fn get_as_mut(&mut self, cell: &Cell) -> &mut Cell {
        self.get_mut(cell.position.x, cell.position.y)
    }

    #[inline(always)]
    pub fn get_by_pos(&self, pos: Coordinate) -> &Cell {
        self.get(pos.x, pos.y)
    }

    #[inline(always)]
    pub fn get_mut_by_pos(&mut self, pos: Coordinate) -> &mut Cell {
        self.get_mut(pos.x, pos.y)
    }

    pub fn tick(&mut self) {
        for cell in &mut self.cells {
            cell.tick();
        }
    }

    pub fn steps_from_pos<'a>(&'a self, pos: Coordinate) -> Vec<&'a Cell> {
        self.steps_from(self.get_by_pos(pos))
    }

    pub fn steps_from<'a>(&'a self, cell: &Cell) -> Vec<&'a Cell> {
        let x = cell.position.x;
        let y = cell.position.y;
        let mut steps = Vec::new();
        let mut push_with_check = |cell: &'a Cell| {
            if !cell.is_obstacle {
                steps.push(cell);
            }
        };
        if x > 0 && y > 0 {
            push_with_check(self.get(x - 1, y - 1));
        }
        if y > 0 {
            push_with_check(self.get(x, y - 1));
        }
        if x < (self.width - 1) && y > 0 {
            push_with_check(self.get(x + 1, y - 1));
        }
        if x < (self.width - 1) {
            push_with_check(self.get(x + 1, y));
        }
        if x < (self.width - 1) && y < (self.height - 1) {
            push_with_check(self.get(x + 1, y + 1));
        }
        if y < (self.height - 1) {
            push_with_check(self.get(x, y + 1));
        }
        if x > 0 && y < (self.height - 1) {
            push_with_check(self.get(x - 1, y + 1));
        }
        if x > 0 {
            push_with_check(self.get(x - 1, y));
        }

        steps
    }

    pub fn place_food_by_pos(&mut self, pos: Coordinate) {
        let mut cell = self.get_mut_by_pos(pos);
        cell.food += 10000;
    }
}

impl fmt::Display for Field {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for (i, cell) in self.cells.iter().enumerate() {
            let symbol = if cell.is_obstacle { '◼' } else { '◻' };
            write!(f, "{}", symbol)?;
            if ((i as i32) + 1) % self.width == 0 {
                write!(f, "\n")?;
            }
        }

        Ok(())
    }
}
