package day05;

import common.*;

public class UpdatedIntCode {
    public static void main(String[] args) {
        IntCodePC pc = new IntCodePC(FileLoader.loadCommaIntFile("input_files/day05.dat"));

        pc.runOpcode();
    }
}
