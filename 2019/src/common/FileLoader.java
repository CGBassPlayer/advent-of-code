package common;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.Collections;

public class FileLoader {

    /**
     * loads a comma separated file of numbers into an ArrayList of integers
     *
     * @param path path of the file to load
     * @return ArrayList of Integers in the file
     */
    public static ArrayList<Integer> loadCommaIntFile(String path) {
        ArrayList<Integer> codeList = new ArrayList<>();
        String bigToken;
        String[] tokens;

        try (BufferedReader in = new BufferedReader(new FileReader(path))) {
            while ((bigToken = in.readLine()) != null) {
                for (int i = 0; i < (tokens = bigToken.split(",")).length; i++) {
                    codeList.add(Integer.parseInt(tokens[i]));
                }
            }
        } catch (IOException e) {
            System.err.println("Failed to load File");
            e.printStackTrace();
        }

        return codeList;
    }

    /**
     * Loads a specific line of a comma separated file of numbers into an ArrayList of integers
     *
     * @param path       path of the file to load
     * @param lineNumber line number to be loaded
     * @return ArrayList of Integers in the file
     */
    public static ArrayList<Integer> loadSingleLineCommaIntFile(String path, int lineNumber) {
        ArrayList<Integer> codeList = new ArrayList<>();
        String[] tokens;

        try (LineNumberReader in = new LineNumberReader(new FileReader(path))) {
            for (String line; (line = in.readLine()) != null; ) {
                if (in.getLineNumber() == lineNumber) {
                    for (int i = 0; i < (tokens = line.split(",")).length; i++) {
                        codeList.add(Integer.parseInt(tokens[i]));
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Failed to load File");
            e.printStackTrace();
        }

        return codeList;
    }

    /**
     * Loads a specific line of a comma separated file of numbers into an ArrayList of Strings
     *
     * @param path       path of the file to load
     * @param lineNumber line number to be loaded
     * @return ArrayList of Strings in the file
     */
    public static ArrayList<String> loadSingleLineCommaStringFile(String path, int lineNumber) {
        ArrayList<String> codeList = new ArrayList<>();
        String[] tokens = new String[1000];

        try (LineNumberReader in = new LineNumberReader(new FileReader(path))) {
            for (String line; (line = in.readLine()) != null; ) {
                if (in.getLineNumber() == lineNumber) {
                    String[] codes = line.split(",");
                    Collections.addAll(codeList, codes);
                }
            }
        } catch (IOException e) {
            System.err.println("Failed to load File");
            e.printStackTrace();
        }

        return codeList;
    }

    /**
     * loads a line separated file of numbers into an ArrayList of integers
     *
     * @param path path of the file to load
     * @return ArrayList of Integers in the file
     */
    public static ArrayList<Integer> loadNewLineIntFile(String path) {
        ArrayList<Integer> codeList = new ArrayList<>();
        String token;

        try (BufferedReader in = new BufferedReader(new FileReader(path))) {
            while ((token = in.readLine()) != null) {
                codeList.add(Integer.parseInt(token));
            }
        } catch (IOException e) {
            System.err.println("Failed to load File");
            e.printStackTrace();
        }

        return codeList;
    }
}
