package day01;

import common.FileLoader;

import java.util.ArrayList;

import static day01.RocketEquation.calculateFuel;

public class RocketEquationPart2 {
    public static void main(String[] args) {
        // Get Ship List
        ArrayList<Integer> rocketMass = FileLoader.loadNewLineIntFile("input_files/day01.dat");
        int totalFuel = 0;

        for (Integer mass : rocketMass) {
            int fuel = calculateFuel(mass);
            while (Math.floor(fuel) >= 0) {
                totalFuel += fuel;
                fuel = calculateFuel(fuel);
                if (fuel < 0) {
                    break;
                }
            }
        }

        System.out.println("Total Fuel Required: " + totalFuel);
    }
}
