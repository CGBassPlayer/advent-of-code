package com.cgbassplayer.aoc2019.day01;

import com.cgbassplayer.aoc2019.common.FileLoader;

import java.util.ArrayList;

public class RocketEquation {
    public static void main(String[] args) {
        ArrayList<Integer> rocketMass = FileLoader.loadNewLineIntFile("input_files/day01.txt");
        int totalFuel = 0;

        for (Integer mass : rocketMass) totalFuel += calculateFuel(mass);

        System.out.println("Total Fuel Required: " + totalFuel);
    }

    /**
     * Calculates required fuel for a given mass.
     *
     * @param mass Mass of the object
     * @return required mass of fuel
     */
    static int calculateFuel(int mass) {
        return (int) Math.floor(mass / 3f) - 2;
    }
}
