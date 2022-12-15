package com.cgbassplayer.aoc2019.common;

import java.util.ArrayList;

public class IntCodePC {
    private final ArrayList<Integer> input;

    public IntCodePC(ArrayList<Integer> input) {
        this.input = input;
    }

    static ArrayList<Integer> originalOpcode(ArrayList<Integer> intCode) {
        for (int i = 0; i < intCode.size(); i += 4) {
            switch (intCode.get(i)) {
                case 99:
                    break;
                case 1:
                    intCode.set(intCode.get(i + 3),
                            intCode.get(intCode.get(i + 1)) + intCode.get(intCode.get(i + 2)));
                    break;
                case 2:
                    intCode.set(intCode.get(i + 3),
                            intCode.get(intCode.get(i + 1)) * intCode.get(intCode.get(i + 2)));
                    break;
            }
        }
        return intCode;
    }

    public ArrayList<Integer> runOpcode() {
        int parameters = 0;
        int index = 0;
        int value = -99;

        while (index < input.size()) {
            switch (input.get(index) % 100) {
                case 99:
                    break;
                case 1:
                    parameters = 3;
                    value = input.get(input.get(index + 1)) + input.get(input.get(index + 2));
                    break;
                case 2:
                    parameters = 3;
                    value = input.get(input.get(index + 1)) * input.get(input.get(index + 2));
                    break;
                case 3:
                    parameters = 1;
                    // takes a single integer as input and saves it to the position given by its only parameter
                    input.set(input.get(index + 1), value); // TODO - figure out the "value" that must be sorted at that parameter
                    break;
                case 4:
                    parameters = 1;
                    // outputs the value of its only parameter
                    input.set(input.get(index + 1), input.get(index + 1));
                    break;
            }
            // TODO - get substring of each parameter for the 5 digit int codes

            index += parameters;
        }

        return new ArrayList<>();
    }
}
